import { getGravatarUrl } from "../lib/gravatar";

export default function Avatar({ email }: { email: string }) {
  const gravatarUrl = getGravatarUrl(email);
  return (
    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={gravatarUrl}
        alt="Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
