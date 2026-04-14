import { createHash } from "crypto";

export function getGravatarUrl(email: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const arr = trimmedEmail.split("@");
  const qq = arr[0];
  if (arr[1] === "qq.com") {
    // QQ 头像 API: https://q1.qlogo.cn/g?b=qq&nk=QQ号&s=尺寸
    return `http://q1.qlogo.cn/g?b=qq&nk=${qq}&s=3`;
  }
  const gravatarUrl = new URL(
    `https://gravatar.loli.net/avatar/${createHash("md5").update(trimmedEmail).digest("hex")}`,
  );

  gravatarUrl.searchParams.set("s", "200"); // 尺寸
  gravatarUrl.searchParams.set("d", "identicon"); // 默认图：identicon(几何图案) / mm(神秘人) / retro
  gravatarUrl.searchParams.set("r", "g"); // 分级：g(大众级)
  return gravatarUrl.href;
}
