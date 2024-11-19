import { Link } from "react-router-dom";

export type AdCardProps = {
  id: number;
  title: string;
  price: number;
  picture: string | undefined;
  category: { id: number; title: string } | undefined | null;
  description?: string;
  owner?: string;
  createdAt?: string;
};

const AdCard = ({ title, price, picture, category, id }: AdCardProps) => (
  <div className="ad-card-container">
    <Link className="ad-card-link" to={`/ad/${id}`}>
      <img className="ad-card-image" src={picture} />
      <div className="ad-card-text">
        <div className="ad-card-title">{title}</div>
        <div className="ad-card-price">{price} €</div>
        <div className="ad-card-category">{category?.title}</div>
      </div>
    </Link>
  </div>
);

export default AdCard;
