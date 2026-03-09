import type { Address } from "../types/user"

type Props = {
  addresses: Address[];
}

export default function UserAddressSection({ addresses }: Props) {

  return (
    <>
      <h2>Adresses</h2>
      <div className="bloc">
        {addresses.map((adr) => (
          <div className={`${adr.isDefault ? "default-adr-card" : "adr-card"}`}>
            <p className={`font-medium adr-card-title`}>
              {adr.name}
            </p>
            <p className="details-info m-0 px-1">{adr.address.address1}</p>
            <p className="details-info m-0 px-1">{adr.address.address2}</p>
            <div className="space-x-3">
              <span className="details-info px-1">{adr.address.postalCode}</span>
              <span className="details-info px-0">{adr.address.city}</span>
            </div>
            <div className="details-cols-2 bg-black mt-3 rounded-sm">
              <span className="text-xs text-center text-(--second-text)">crée le {new Date(adr.createdAt).toLocaleDateString()}</span>
              <span className="text-xs text-center text-(--second-text)">modifié le {new Date(adr.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}

      </div>
    </>
   
  )
}