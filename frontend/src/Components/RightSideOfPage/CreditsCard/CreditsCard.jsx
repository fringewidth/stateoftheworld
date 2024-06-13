import "./CreditsCard.css";

function CreditsCard() {
  return (
    <>
      <ul className="flex gap-2 p-2 max-lg:text-sm max-md:flex-col max-md:p-5 max-md:mt-5 items-center justify-center flex-wrap">
        <li className="whitespace-nowrap">Dharmisht SVK</li>
        <li className="whitespace-nowrap">Dhyaan Kotian</li>
        <li className="whitespace-nowrap">Hrishik Sai</li>
      </ul>
    </>
  );
}

export default CreditsCard;
