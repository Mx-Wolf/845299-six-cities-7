import { useParams } from "react-router-dom";
import { api } from "../../services/rtk-api";

export const useIsEmpty = (): boolean => {
  const { city } = useParams<{ city:string | undefined }>();

  return !api.endpoints.getHotels.useQuery().data?.some((hotel) => hotel.city.name === city);
};
