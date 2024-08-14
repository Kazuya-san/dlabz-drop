import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TournamentForm } from "./forms/tournament/TournamentForm";
import { ScrollArea } from "@/components/ui/scroll-area";

export async function TournamentListingCreateModal() {
  //   const { user } = (await getSession()) as Session;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Tournament</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px] h-full max-h-[600px] my-6">
        <ScrollArea>
          <DialogHeader className="px-3">
            <DialogTitle>Create Tournament</DialogTitle>
            <DialogDescription>
              Create Tournament here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-3">
            <TournamentForm>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </TournamentForm>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
