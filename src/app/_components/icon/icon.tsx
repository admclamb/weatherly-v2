import Image from "next/image";
import { env } from "~/env";

type Props = {
  icon: string;
  description: string;
  size?: string;
  className?: string;
};

const Icon = ({ icon, description, size = "2x", className = "" }: Props) => {
  const dimension = size === "2x" ? 100 : 50;

  return (
    icon && (
      <Image
        className={className}
        src={`${env.WEATHER_API_URL}/img/wn/${icon}@${size}.png`}
        alt={description}
        width={dimension}
        height={dimension}
        priority={false}
      />
    )
  );
};

export default Icon;
