import { usePathname } from "next/navigation";

const useGetPathName = () => {
  const pathname = usePathname();
  return pathname;
};

export default useGetPathName;
