import { useEffect, useState } from "react";


 const rndNum = (min: number, max: number) => Math.floor(Math.random()*(max-min)+min); 
 const genNumArr = (count: number) => [... Array(count).keys()].map(_ => rndNum(0, URIs.length-1));

 const URIs = [
     "https://similonap.github.io/webframeworks-cursus/assets/images/slot-cherry-cce8464b32439efb4f79fba017477125.png",
     "https://similonap.github.io/webframeworks-cursus/assets/images/slot-lemon-52cd7112e8b6d398f97e69f8ce2da623.png",
     "https://similonap.github.io/webframeworks-cursus/assets/images/slot-melon-593489676a762d464eaea97127970d28.png", 
     "https://similonap.github.io/webframeworks-cursus/assets/images/slot-prune-e486170eb7c22e6e9aed5de0316b5209.png",
     "https://similonap.github.io/webframeworks-cursus/assets/images/slot-seven-e71e0d10655b5491197925624b5ac139.png"
 ]

const Slot = ({value}: {value: number}) => (<img src={URIs[value]} style={{width: 100}} className="border rounded"/>);

 type SlotMachineState = {
    slots: number[];
    money?: number;
 }

export const Slotmachine = () => {
    const [state, setState] = useState<SlotMachineState>({
        slots: genNumArr(3)
    });

    // Check money set ? (assign new value += ? win : loss): assign default money value.
    useEffect(() =>  setState({...state, money: state.money ? state.money + (state.slots.every(n => n == state.slots[0]) ? 20 : -1) : 100}), [state.slots])
  
   return (
       <div className="d-flex flex-column">
            <span className="border p-2 text-center">
                Money remaining: {state.money}
            </span>

            <div className="d-flex justify-content-between flex-row mx-auto my-2">
                {state.slots.map((v, i) => <Slot key={i} value={v} />)}
            </div>

            <input type="button" className="btn btn-success" disabled={!state.money || state.money < 0} onClick={() => setState({...state, slots: genNumArr(3)})} value="Pull lever"   />

       </div>
   )
}
 
 export default Slotmachine;