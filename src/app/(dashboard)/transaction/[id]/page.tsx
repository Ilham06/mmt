import TransactionFormPage from "@/components/ui/transaction/TransationForm";


export default function Page({ params }: any) {
  return <TransactionFormPage id={params.id} />;
}
