import {
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  rating: number;
  max?: number;
}

export function RatingStars({ rating, max = 5 }: Props) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => {
        const value = i + 1;

        let icon = regularStar;

        if (rating >= value) {
          icon = faStar;
        } else if (rating >= value - 0.5) {
          icon = faStarHalfAlt;
        }

        return (
          <FontAwesomeIcon
            key={i}
            icon={icon}
            className="text-primary"
          />
        );
      })}
    </div>
  );
}