import "./CreditsCard.css";

function CreditsCard() {
  return (
    <>
      <ul className="flex gap-2 p-2 max-lg:text-sm max-md:flex-col items-center justify-center flex-wrap">
        <li className="whitespace-nowrap tracking-tighter">Hrishik Sai</li>
        <li className="whitespace-nowrap tracking-tighter">Dharmisht SVK</li>
        <li className="whitespace-nowrap tracking-tighter">Dhyaan Kotian</li>
      </ul>
    </>
  );
}

export default CreditsCard;
