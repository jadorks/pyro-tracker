import { useEvmNativeBalance } from "@moralisweb3/next";

export default function Home() {
  const address = "0x3145Fbf82170A049c30Cbd2706e0714f47826cb8";
  const { data: nativeBalance } = useEvmNativeBalance({ address });
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance?.balance.ether}</h3>
    </div>
  );
}
