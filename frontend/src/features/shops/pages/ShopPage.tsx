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
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";


type SocialKey = "facebook" | "instagram" | "tiktok";

export default function ShopPage() {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setMain } = useRightPanel();
  const { data, isLoading, isError } = useShopDashboard(id!);


  const socialIcons: Record<SocialKey, IconDefinition> = {
    facebook: faFacebook,
    instagram: faInstagram,
    tiktok: faTiktok,
  }

  useAdminPage("Dashboard du shop");

  if (isLoading) {
    return (
      <Loader />
    );
  }

  if (isError || !data) return <div>Error loading user</div>;

  const handleWithdrawModes = () => {
    setMain({
      type: "shopWithdrawModes",
      title: "Détail des modes de retrait",
      data: {
        clickCollect: data?.shop.clickCollect,
        markets: data?.shop.markets
      },
    })
  }

  const handleSocials = () => {
    setMain({
      type: "shopSocials",
      title: "Détail des réseaux sociaux",
      data: {
        socials: data.shop.socials,
        socialPostSettings: data.shop.socialPostSettings
      }
    })
  }

  const handlePhotos = () => {
    setMain({
      type: "shopPhotos",
      title: "Détail des photos",
      data: {
        photos: data.shop.photos
      }
    })
  }

  const handleVideos = () => {
    setMain({
      type: "shopVideos",
      title: "Détail des videos",
      data: {
        videos: data.shop.video
      }
    })
  }

  const handleCrew = () => {
    setMain({
      type: "shopCrew",
      title: "Détail de l'équipe",
      data: {
        crew: data.shop.crew
      }
    })
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
                onClick={() => navigate(`/admin/producers?search=${data.producer.siren}`)}
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
                  {renderBoolSticker((data.shop.markets?.length ?? 0) > 0)}
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
                info={data.shop.photos?.length.toString() ?? 0}
                onClick={handlePhotos}  // afficher dans le rightPanel, toutes les photos
                extraClasses="btn-success"
                textClasses=""
              />
              <WithInfoButton
                label="Vidéos"
                info={data.shop.video?.length.toString() ?? 0}
                onClick={handleVideos}  // afficher dans le rightPanel, toutes les videos
                extraClasses="btn-success"
                textClasses=""
              />
              <WithInfoButton
                label="Équipe"
                info={data.shop.crew?.length.toString() ?? 0}
                onClick={handleCrew}  // afficher dans le rightPanel, tous les membres du crew
                extraClasses="btn-warning"
                textClasses=""
              />
            </div>

            {/* réseaux sociaux */}
            <div className="shop-dashboard-bloc space-y-1">
              <h2>Réseaux sociaux</h2>

              <div className="flex flex-row justify-center gap-2 my-5">
                {data.shop.socials && Object.entries(data.shop.socials)
                  .filter(([_, value]) => value?.connected)
                  .map(([key, value]) => {
                    const icon = socialIcons[key as keyof typeof socialIcons];

                    if (!icon) return null;

                    return (
                      <a
                        href={`https://${key}.com/${value?.username?.replace("@", "")}`}
                        target="_blank"
                        key={key}
                      >
                        <FontAwesomeIcon
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