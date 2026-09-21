import Link from 'next/link';
import Image from 'next/image';
import { UpcomingBirthday } from '../interfaces/metrics.interface';
import { Cake } from 'lucide-react';

interface UpcomingBirthdaysCardProps {
  birthdays: UpcomingBirthday[];
}

export function UpcomingBirthdaysCard({ birthdays }: UpcomingBirthdaysCardProps) {
  return (
    <div className="bg-surface border border-border-primary rounded-lg flex flex-col transition-colors overflow-hidden h-full">
      <div className="flex items-center justify-between p-5 border-b border-border-primary bg-background shrink-0">
        <h2 className="text-sm font-bold text-text-main transition-colors flex items-center gap-2">
          <Cake /> Cumpleaños (7 días)
        </h2>
        <div className="text-xs font-bold text-brand-main bg-brand-surface px-2 py-0.5 rounded">
          {birthdays.length}
        </div>
      </div>

      <div className="flex-1 p-0 overflow-y-auto max-h-80">
        <div className="flex flex-col">
          {birthdays.length === 0 ? (
            <div className="p-6 text-center text-sm text-text-muted">
              No hay cumpleaños próximos.
            </div>
          ) : (
            birthdays.map((birthday, index) => (
              <Link
                key={birthday.id}
                href={`/dashboard/miembros/${birthday.id}`}
                className={`flex items-center justify-between px-5 py-4 hover:bg-surface-hover transition-colors cursor-pointer w-full ${
                  index !== birthdays.length - 1 ? 'border-b border-border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted transition-colors relative overflow-hidden">
                    {birthday.profileImageUrl ? (
                      <Image 
                        src={birthday.profileImageUrl} 
                        alt={birthday.name} 
                        fill 
                        sizes="32px"
                        className="object-cover" 
                      />
                    ) : (
                      birthday.initials
                    )}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm text-text-main font-medium transition-colors truncate">
                      {birthday.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {(() => {
                        const [year, month, day] = birthday.birthDate.split('T')[0].split('-');
                        return `${day}/${month}`;
                      })()}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end shrink-0 ml-3">
                  {birthday.isToday ? (
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-brand-main text-white rounded-full flex items-center gap-1 shadow-sm">
                      ¡HOY!
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-text-muted">
                      En {birthday.daysLeft} {birthday.daysLeft === 1 ? 'día' : 'días'}
                    </span>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
