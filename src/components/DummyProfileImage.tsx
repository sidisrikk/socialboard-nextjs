import Image from "next/image";

export function DummyProfileImage({
  className,
  size,
}: {
  size: number;
  className: string;
}) {
  return (
    <Image
      alt="profile image"
      src={"/dummy-profile.jpg"}
      width={size}
      height={size}
      className={className}
    />
  );
}
