import { description, title } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import SlotMachine from "@/components/slot-machine";

export { generateMetadata };

export default function Page() {
  return <SlotMachine />;
}
