'use client';

import { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useMembers } from '../hooks/useMembers';
import { usePlans } from '@/features/plans/hooks/usePlans';
import { MemberList } from './MemberList';
import { MembersToolbar, SortOption } from './MembersToolbar';
import { MembersTableHeader } from './MembersTableHeader';
import { MembersPagination } from './MembersPagination';
import { TableSkeleton } from '@/common/components/ui/skeletons/TableSkeleton';
import { MemberSortBy, SortOrder } from '../interfaces/members.interface';

const ITEMS_PER_PAGE = 10;

export function MembersDirectory() {
  const [filter, setFilter] = useState<
    'RELEVANT' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  >('RELEVANT');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{
    sortBy: MemberSortBy;
    order: SortOrder;
  } | null>(null);

  const searchParams = useSearchParams();
  const q = searchParams.get('q') || undefined;

  const prevQRef = useRef(q);
  if (prevQRef.current !== q) {
    prevQRef.current = q;
    setCurrentPage(1);
  }

  const { data: plansResponse } = usePlans(1, 100);
  const plans = plansResponse?.data || [];

  const stateQuery = filter === 'RELEVANT' ? 'ACTIVE,SUSPENDED' : filter;

  const { data: response, isLoading } = useMembers({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    term: q,
    state: stateQuery,
    planId: selectedPlanId || undefined,
    sortBy: sortConfig?.sortBy,
    order: sortConfig?.order,
  });

  const members = response?.data || [];
  const totalPages = response?.meta?.lastPage || 1;

  const handlePlanChange = (planId: string) => {
    setSelectedPlanId(planId);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setCurrentPage(1);
    switch (value) {
      case 'createdAt_desc':
        setSortConfig({ sortBy: 'createdAt', order: 'desc' });
        break;
      case 'name_asc':
        setSortConfig({ sortBy: 'name', order: 'asc' });
        break;
      case 'name_desc':
        setSortConfig({ sortBy: 'name', order: 'desc' });
        break;
      case 'surname_asc':
        setSortConfig({ sortBy: 'surname', order: 'asc' });
        break;
      case 'surname_desc':
        setSortConfig({ sortBy: 'surname', order: 'desc' });
        break;
      default:
        setSortConfig(null);
        break;
    }
  };

  const handleSortName = () => {
    setCurrentPage(1);
    if (!sortConfig || sortConfig.sortBy !== 'name') {
      setSortConfig({ sortBy: 'name', order: 'asc' });
    } else if (sortConfig.order === 'asc') {
      setSortConfig({ sortBy: 'name', order: 'desc' });
    } else {
      setSortConfig(null);
    }
  };

  const handleFilterChange = (
    newFilter: 'RELEVANT' | 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  ) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (isLoading && members.length === 0) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-background flex flex-col gap-6">
      <MembersToolbar
        selectedPlanId={selectedPlanId}
        onPlanChange={handlePlanChange}
        plans={plans}
        sortConfig={sortConfig}
        onSortChange={handleSortChange}
        filter={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="bg-surface border border-border-primary rounded-lg flex flex-col overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-250">
            <MembersTableHeader
              sortConfig={sortConfig}
              onSortName={handleSortName}
            />

            <div className="flex flex-col relative">
              {isLoading && members.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 z-10">
                  <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-3" />
                  <p className="text-text-muted text-sm">
                    Cargando información de miembros...
                  </p>
                </div>
              )}
              {isLoading && members.length > 0 && (
                <div className="absolute inset-0 bg-surface/80 flex flex-col items-center justify-center z-10 backdrop-blur-[1px]">
                  <Loader2 className="w-8 h-8 text-brand-main animate-spin mb-3" />
                  <p className="text-text-muted text-sm">
                    Cargando información de miembros...
                  </p>
                </div>
              )}
              {members.length > 0
                ? members.map((member) => {
                    const activeSub =
                      member.subscriptions?.find(
                        (sub) =>
                          sub.status === 'ACTIVE' &&
                          new Date(sub.startDate) <= now &&
                          new Date(sub.endDate) > now
                      ) ||
                      member.subscriptions?.find(
                        (sub) =>
                          sub.status === 'ACTIVE' &&
                          new Date(sub.endDate) > now
                      );

                    const planName = activeSub?.plan?.name || 'Sin plan';

                    let dynamicState = member.state;
                    if (dynamicState === 'ACTIVE' && !activeSub) {
                      dynamicState = 'SUSPENDED';
                    }

                    return (
                      <MemberList
                        key={member.uuid}
                        name={`${member.name} ${member.surname}`}
                        memberID={member.dni}
                        uuid={member.uuid}
                        status={dynamicState}
                        profileImageUrl={member.profileImageUrl || ''}
                        phoneNumber={member.phoneNumber || ''}
                        observations={member.observations || ''}
                        planName={planName}
                      />
                    );
                  })
                : !isLoading && (
                    <div className="flex-1 flex items-center justify-center py-10 text-sm text-text-muted">
                      No hay miembros que coincidan con los filtros.
                    </div>
                  )}
            </div>
          </div>
        </div>

        <MembersPagination
          currentPage={currentPage}
          totalPages={totalPages}
          isLoading={isLoading}
          onPrevPage={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          onNextPage={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        />
      </div>
    </div>
  );
}
