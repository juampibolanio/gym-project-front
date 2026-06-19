import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GymsService } from '../services/gyms.service';
import { UpdateGymPayload } from '../interfaces/gym.interface';

export const useGym = (term?: string) => {
  return useQuery({
    queryKey: ['gym', term],
    queryFn: () => GymsService.getByTerm(term!),
    enabled: !!term,
  });
};

export const useUpdateGym = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGymPayload }) =>
      GymsService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gym', variables.id] });
    },
  });
};
