import { SettingsBox } from "./SettingsBox";
import { UploadFileBox } from "./UploadFileBox";

export function Content() {
  return (
    <div className="flex-1 flex flex-col w-full gap-6">
      <UploadFileBox />
      <SettingsBox />
    </div>
  );
}
