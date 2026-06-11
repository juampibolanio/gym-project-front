import { EditMemberForm } from '@/features/members/components/EditMemberForm';

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <EditMemberForm id={id} />;
}
