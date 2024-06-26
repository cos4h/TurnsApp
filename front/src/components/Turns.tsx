import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdPendingActions } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { FaHistory } from "react-icons/fa";
import moment from "moment";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ITurn from "@/interfaces/ITurn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { cancelTurn } from "@/reducer/turnsReducer";

function Turns() {
  const [turns, setTurns] = useState<ITurn[]>([]);
  const turnsFromDB: ITurn[] = useSelector(
    (state: { turns: [] }) => state.turns
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    setTurns(turnsFromDB);
  }, [turnsFromDB]);

  const handleTurnCancel = (id_turn: string) => {
    dispatch(cancelTurn(id_turn));
  };

  const convertMinsToHrsMins = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const digitH = h < 10 ? "0" + h : h.toString();
    const digitM = m < 10 ? "0" + m : m.toString();
    return `${digitH}:${digitM}`;
  };

  const renderTurns = (turnsFiltereds: ITurn[], isPendig: boolean) => {
    if (turns.length > 0) {
      return turnsFiltereds.map((turn) => (
        <Card className="max-w-60" key={turn.id_turn}>
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <div className="flex justify-around gap-x-4">
                <p>Date: {turn.date.split("-").reverse().join("/")}</p>
              </div>
              <div className="flex flex-col">
                <p>Start: {convertMinsToHrsMins(turn.start_time)}</p>
                <p>Finish: {convertMinsToHrsMins(turn.finish_time)}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img
              src="https://canchasintetica.com/wp-content/uploads/2023/01/cancha-sintetica-de-futbol-scaled.jpg"
              className="rounded-md"
            />
          </CardContent>
          <CardFooter className="flex justify-center">
            {isPendig && (
              <Button
                className="bg-red-600 hover:bg-red-800 w-4/6"
                onClick={() => {
                  handleTurnCancel(turn.id_turn as string);
                }}
              >
                cancel
              </Button>
            )}
          </CardFooter>
        </Card>
      ));
    }
    return null;
  };
  return (
    <div className="mt-8">
      <Accordion type="single" collapsible defaultValue="pendings">
        <AccordionItem value="pendings" className="w-[78vw]">
          <AccordionTrigger>
            <div className="flex items-center gap-6">
              <MdPendingActions size={40} color="orange" />
              <h6 className="text-2xl">Turnos Pendientes</h6>
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-4 gap-4 px-4">
            {renderTurns(
              turns.filter(
                (turn) =>
                  moment(turn.date).isAfter(moment()) &&
                  turn.state !== "Canceled"
              ),
              true
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="canceleds">
          <AccordionTrigger>
            <div className="flex items-center gap-6">
              <FcCancel size={40} color="red" />
              <h6 className="text-2xl">Turnos Cancelados</h6>
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-4 gap-4">
            {renderTurns(
              turns.filter((turn) => (turn.state as string) === "Canceled"),
              false
            )}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center gap-6">
              <FaHistory size={35} color="blue" />
              <h6 className="text-2xl">Historial de turnos</h6>
            </div>
          </AccordionTrigger>
          <AccordionContent className="grid grid-cols-4 gap-4">
            {renderTurns(turns, false)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Turns;
