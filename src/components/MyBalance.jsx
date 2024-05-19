import { useEffect, useState } from "react";
import { getMe } from "../api/auth";
import Cookies from "js-cookie";

function MyBalance() {
  const [saldoAmmount, setSaldoAmmount] = useState(0);
  const token = Cookies.get('token');

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  useEffect(() =>  {
    const getSaldo = async () => {
      const user = await getMe(token)
      setSaldoAmmount(user.saldoElektronik)
    }
    getSaldo()
  }, [token])

  return (
    <div>
      <p>MyBalance :</p>
      <p>{formatPrice(saldoAmmount)}</p>
    </div>
  );
}

export default MyBalance;
