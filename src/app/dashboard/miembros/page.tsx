import { MembersDirectory } from '@/features/members/components/MembersDirectory';
import CreateMemberButton from '@/features/members/components/CreateMemberButton';

export default function MembersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-text-main">Directorio de miembros</h1>
          <p className="text-sm text-text-muted transition-colors">
            Administre todas las membresias activas e inactivas del gimnasio
          </p>
        </div>
        
        <CreateMemberButton />
      </div>
      <MembersDirectory />
    </div>
  );
}