import { useNavigate, useParams } from "react-router-dom"
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useShopDashboard } from "../hooks/useShopDashboard";
import Loader from "../../../components/admin/Loader";
import { ShopHeaderSection } from "../components/ShopHeaderSection";
import { EyeButton } from "../../../components/admin/buttons/EyeButton";
import { renderBoolSticker } from "../../../utils/layout/renderStickers";
import { WithInfoButton } from "../../../components/global/buttons/withInfoButton";
import ShopOrderSection from "../components/ShopOrderSection";
import ShopNoteSection from "../components/ShopNoteSection";
import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useInfoContext } from "../../../hooks/useInfoContext";
import type { ModelInfoContext } from "../../../layouts/admin/contexts/AdminInfoContext";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useEffect, useState } from "react";


type SocialKey = "facebook" | "instagram" | "tiktok";

export default function ShopPage() {

  const { id } = useParams();
  const navigate = useNavigate();
  const { isRightOpen, openRight, closeRight } = useAdminLayout();

  useAdminPage("Dashboard du shop");

  const { data, isLoading, isError } = useShopDashboard(id!);

 

  console.log(data)

  const [ infoContext, setInfoContext ] = useState<ModelInfoContext | null>(null)
  
  useInfoContext(infoContext);

  useEffect(() => {
    if (infoContext) {
      openRight();
    } else {
      closeRight();
    }
  }, [infoContext])

  if (isError || !data) return <div>Error loading user</div>;

  const handleWithdrawModes = () => {
    setInfoContext({
      type: "shopWithdrawModes",
      title: "Détail des modes de retrait",
      data: {
        clickCollect: data?.shop.clickCollect,
        markets: data?.shop.markets
      },
    })
  }

  const handleSocials = () => {
    console.log("youpi")
    setInfoContext({
      type: "shopSocials",
      title: "Détail des réseaux sociaux",
      data: {
        socials: data.shop.socials,
        socialPostSettings: data.shop.socialPostSettings
      }
    })
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }



  const socialIcons: Record<SocialKey, IconDefinition> = {
    facebook: faFacebook,
    instagram: faInstagram,
    tiktok: faTiktok,
  }



   

  return (
    <div className="space-y-8 px-6 mx-auto max-w-7xl">

      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-8">

          <div className="grid grid-cols-5 gap-3">

            <div className="col-span-3 space-y-3">
              <ShopHeaderSection shop={data.shop} />
              <ShopOrderSection shopId={data.shop._id} />
            </div>

            <div className="col-span-2 space-y-3">
              <div className="shop-dashboard-bloc">
                <h2>Adresse</h2>
                <div className="space-y-2">
                  <p className="details-info m-0 px-1">{data.shop.address.address1}</p>
                  <p className="details-info m-0 px-1">{data.shop.address.address2}</p>
                  <div className="space-x-3">
                    <span className="details-info px-1">{data.shop.address.postalCode}</span>
                    <span className="details-info px-0">{data.shop.address.city}</span>
                  </div>
                  <div className="space-x-3">
                    <span className="bloc-label">LAT:</span>
                    <span className="">{data.shop.address.latitude}</span>
                    <span className="bloc-label">LON:</span>
                    <span className="">{data.shop.address.longitude}</span>
                  </div>
                  <div className="details-cols-2 bg-black rounded-sm">
                    <span className="text-xs text-center text-(--second-text)">créée le {new Date(data.shop.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <ShopNoteSection shopId={data.shop._id} />
            </div>

          </div>


        </div>

        <div className="col-span-2 space-y-3">

          {/* producer */}
          <div className="shop-dashboard-bloc">
            <div className="flex flex-row justify-between">
              <h2 className="mb-2">Producteur</h2>
              <EyeButton 
                onClick={() => navigate(`/admin/producers/${data.producer._id}`)}
                extraClasses=""
              />
            </div>
            
            <p className="mb-2">
              {data.producer.socialReason}
            </p>
            <p className="m-0 space-x-3">
              <span className="bloc-label">SIREN:</span>
              <span>{data.producer.siren}</span> 
            </p>
            <p className="m-0 space-x-3">
              <span className="bloc-label">Onboarding:</span>
              <span>{data.producer.onboardingStep}</span> 
            </p>
          </div>

          {/* user */}
          <div className="shop-dashboard-bloc">
            <div className="flex flex-row justify-between">
              <h2 className="mb-2">Utilisateur</h2>
              <EyeButton 
                onClick={() => navigate(`/admin/users/${data.user._id}`)}
                extraClasses=""
              />
            </div>
            
            <p className="mb-2">
              {data.user.firstname} {data.user.lastname}
            </p>
            <p className="m-0">
              {data.user.email}
            </p>
          </div>

          {/* Modes de retrait */}
            <div className="shop-dashboard-bloc space-y-1">
              <h2>Modes de retrait</h2>
              <div className="grid grid-cols-4 mt-4">
                <div className="col-span-3">
                  <p className="bloc-label">Click&Collect</p>
                </div>
                <div>
                  {renderBoolSticker(data.shop.clickCollect.isActive)}
                </div>
                <div className="col-span-3">
                  <p className="bloc-label">Points de vente</p>
                </div>
                <div>
                  {renderBoolSticker(data.shop.markets.length > 0)}
                </div>
                <div className="col-span-3">
                  <p className="bloc-label">Livraison (bientôt)</p>
                </div>
              </div>
              <div className="justify-self-center-safe">
                <button
                  onClick={handleWithdrawModes} // afficher dans le rightPanel, toutes les infos de clickCollect et markets
                  className="btn-outline-primary"
                >Voir détails</button>
              </div>
            </div>

            {/* Photos, vidéo & équipe */}
            <div className="flex flex-col space-y-3">
              <WithInfoButton
                label="Photos"
                info={data.shop.photos.length.toString()}
                onClick={() => {}}  // afficher dans le rightPanel, toutes les photos
                extraClasses="btn-success"
                textClasses=""
              />
              <WithInfoButton
                label="Vidéos"
                info={data.shop.video.length.toString()}
                onClick={() => {}}  // afficher dans le rightPanel, toutes les videos
                extraClasses="btn-success"
                textClasses=""
              />
              <WithInfoButton
                label="Équipe"
                info={data.shop.crew.length.toString()}
                onClick={() => {}}  // afficher dans le rightPanel, tous les membres du crew
                extraClasses="btn-warning"
                textClasses=""
              />
            </div>

            {/* réseaux sociaux */}
            <div className="shop-dashboard-bloc space-y-1">
              <h2>Réseaux sociaux</h2>

              <div className="flex flex-row justify-center gap-2 my-5">
                {Object.entries(data.shop.socials)
                  .filter(([_, value]) => value?.connected)
                  .map(([key, value]) => {
                    const icon = socialIcons[key as keyof typeof socialIcons];

                    if (!icon) return null;

                    return (
                      <a
                        href={`https://${key}.com/${value?.username?.replace("@", "")}`}
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          key={key}
                          icon={icon}
                          className="text-2xl"
                        />
                      </a>
                    )
                  })
                
                }
              </div>

              <div className="flex flex-row justify-center">
                <button
                  onClick={handleSocials} // afficher dans le rightPanel, toutes les infos des socials et socialSettings
                  className="btn-outline-primary"
                >
                  Paramètres
                </button>
              </div>
            </div>


        </div>
      </div>

    </div>
  )
}