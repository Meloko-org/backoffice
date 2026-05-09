import type { ModelInfoContext } from "../../../layouts/admin/contexts/RightPanelContext";
import { renderSocialConnected, renderValidateState } from "../utils/renderStates";

type Props = {
  context: Extract<ModelInfoContext, { type: "shopSocials"}>
}


export default function ShopSocialDetails({ context }: Props) {

  const socials = context.data.socials;
  const hashtags = context.data.socialPostSettings.customHashtags ?? [];
  const mentions = context.data.socialPostSettings.customMentions ?? [];
  const frequency = context.data.socialPostSettings.frequency;

  const dayLabels = [
    "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"
  ]

  console.log("le context :", context)


  return (
    <div className="bloc-details">

      <div className="details-cols-2">
        <div className="">
          {Object.entries(socials).map(([key, value]) => (
            <div key={key} className="mb-3">

              <div className="flex flew-row justify-center items-center mb-2">
                <div className="text-primary font-semibold uppercase text-center text-xs mr-3">
                  {key.toUpperCase()}
                </div>
                {renderSocialConnected(value?.connected!)}
              </div>
              

              <div>
                <p className="details-label">
                  UserName
                </p>
                <p className="details-info">
                  {value?.username}
                </p>
              </div>
              <div>
                <p className="details-label">
                  params
                </p>

                <div className="px-3">
                  <div className="flex flex-row justify-between items-center">
                    <span className="bloc-label">Enable</span>
                    <span className="">{renderValidateState(value?.isEnabled!)}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="bloc-label">UserId</span>
                    <span className="">{value?.userId}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="bloc-label">PageName</span>
                    <span className="">{value?.pageName}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="bloc-label">PageId</span>
                    <span className="">{value?.pageId}</span>
                  </div>
                  <div className="">
                    <span className="bloc-label">AccessToken</span>
                    <span className="">{value?.accesstoken}</span>
                  </div>
                  <div className="">
                    <span className="bloc-label">RefreshToken</span>
                    <span className="">{value?.refreshToken}</span>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <span className="bloc-label">Expire</span>
                    <span className="">{value?.expiresAt && new Date(value?.expiresAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="">
          <div className="text-success font-semibold uppercase text-center text-xs mr-3 mb-3">
            PostSettings
          </div>

          <div>
            <p className="details-label-success">
              custom hastags
            </p>
            <p className="details-info">
              {hashtags.map((tag) => (
                <p >#{tag}</p>
              ))}
            </p>
          </div>

          <div>
            <p className="details-label-success">
              custom mentions
            </p>
            <p className="details-info">
              {mentions.map((mention) => (
                <p >{mention}</p>
              ))}
            </p>
          </div>

          <div>
            <p className="details-label-success">
              frequency
            </p>
            <div className="px-3">
              <div className="flex flex-row justify-between items-center">
                <span className="bloc-label">Mode</span>
                <span className="">{frequency.mode}</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span className="bloc-label">timesPerWeek</span>
                <span className="">{frequency.timePerWeek}</span>
              </div>
              <div>
                <p className="bloc-label">Preferred Days</p>
                {frequency.preferredDays.length > 0 
                  ? (
                      frequency.preferredDays.map((day) => (
                        <p>{dayLabels[day -1]}</p>
                      ))
                    )
                  : "Aucun"
                  }
              </div>
              
            </div>
          </div>



        </div>

      </div>
      
     
    </div>
  )
}