import { fetchPurchaseHistory } from "@/api/payment";
import useLocalStorage from "@/utils/hooks/useLocalStorage";
import { Stack, useToast } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import TransactionHistory from "./assetTransactionHistory";
import { useMutation } from "react-query";
import { COOWNERSHIPTRANSACTIONHISTORYCOLUMN } from "@/components/tables/coownerShipTransactionHistoryColumn";

const OutrightTransactionInfo = () => {
  const [user] = useLocalStorage("LoggedinUser");
  const toast = useToast();
  const query = useParams();
  const equityId = query?.id;

  const TRANSACTIONS_HISTORY = useMutation(
    () => fetchPurchaseHistory(equityId, user?.user?.id),
    {
      onError: (err) => {
        toast({
          title: "Error fetching transaction history",
          description: err?.response?.message,
          status: "error",
        });
      },
      mutationKey: ["transaction_history", equityId, user?.user?.id],
      retry: 0,
    }
  );
  useEffect(() => {
    TRANSACTIONS_HISTORY?.mutate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const arrayData = TRANSACTIONS_HISTORY?.data?.data ?? [];

  return (
    <Stack>
      <TransactionHistory
        arrayData={arrayData}
        isLoading={TRANSACTIONS_HISTORY?.isLoading}
        Column={COOWNERSHIPTRANSACTIONHISTORYCOLUMN}
        isError={TRANSACTIONS_HISTORY?.isError}
        error={TRANSACTIONS_HISTORY?.error}
        numberOfTransactions={arrayData?.length}
        spacing={{ xl: "15.66px", base: "10.68px" }}
      />
    </Stack>
  );
};

export default OutrightTransactionInfo;
