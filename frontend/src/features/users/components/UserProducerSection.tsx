import { Link } from "react-router-dom";

type Props = {
  isProducer: boolean;
  producerId?: string | null;
};

export default function UserProducerSection({
  isProducer,
  producerId,
}: Props) {

  // if (!isProducer) return null;

  return (
    <div className="bloc">

      <div className="flex flex-row space-x-7">
        <h2>Producteur</h2>

        <div className="flex justify-between items-center space-x-7">
          {isProducer ? (
            <>
              <p className="bloc-sub-text">
                Cet utilisateur est également producteur.
              </p>

              <Link
                to={`/admin/producers/${producerId}`}
                className="btn-outline-primary"
              >
                Voir la fiche
              </Link>
            </>
          ) : (
            <p className="bloc-sub-text">
              Cet utilisateur n'est pas producteur.
            </p>
          )}
          
        </div>

      </div>
      
    </div>
  );
}
