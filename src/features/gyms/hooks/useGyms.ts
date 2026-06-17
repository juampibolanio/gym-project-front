import { useQuery } from "@tanstack/react-query"
import { GymsService } from "../services/gyms.service"

export const useGym = (term?: string) => {
    return useQuery({
        queryKey: ['gym', term],
        queryFn: () => GymsService.getByTerm(term!),
        enabled: !!term, 
    });
};
