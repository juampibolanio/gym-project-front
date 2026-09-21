'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MemberListProps } from '../interfaces/members.interface';
import {
  statusStyles,
  dotStyles,
  statusTranslations,
} from '../constants/member-styles-ui.constants';
import { MemberRowActions } from './MemberRowActions';

export function MemberList({
  name,
  memberID,
  uuid,
  status,
  phoneNumber,
  observations,
  planName,
  profileImageUrl,
  birthDate,
}: MemberListProps & { profileImageUrl?: string | null; birthDate?: string }) {
  const router = useRouter();

  const safeStatusStyles = statusStyles[status] || statusStyles['INACTIVE'];
  const safeDotStyles = dotStyles[status] || dotStyles['INACTIVE'];
  const displayStatus = statusTranslations[status] || status;

  const handleRowClick = () => {
    router.push(`/dashboard/miembros/${uuid}`);
  };

  const handleMouseEnter = () => {
    router.prefetch(`/dashboard/miembros/${uuid}`);
  };

  const initials =
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'NA';

  return (
    <div
      onClick={handleRowClick}
      onMouseEnter={handleMouseEnter}
      className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr_2fr_1fr_50px] gap-4 items-center px-5 py-4 border-b border-border-primary hover:bg-surface-hover transition-colors min-w-225 cursor-pointer"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted relative overflow-hidden">
            {profileImageUrl ? (
              <Image
                src={profileImageUrl}
                alt={name}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-text-main truncate">{name}</p>
            <p className="text-xs text-text-muted mt-0.5 truncate">{memberID}</p>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold border rounded-full uppercase transition-colors whitespace-nowrap ${safeStatusStyles}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${safeDotStyles}`}></span>
          {displayStatus}
        </span>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-text-main truncate">
          {phoneNumber || '-'}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-text-main truncate">
          {birthDate
            ? (() => {
                const [year, month, day] = birthDate.split('T')[0].split('-');
                return `${day}/${month}/${year}`;
              })()
            : '-'}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium text-text-main truncate">
          {planName || 'Sin plan'}
        </p>
      </div>

      <div className="min-w-0">
        <p className="text-sm text-text-muted truncate">
          {observations || '-'}
        </p>
      </div>

      <MemberRowActions uuid={uuid} name={name} />
    </div>
  );
}
