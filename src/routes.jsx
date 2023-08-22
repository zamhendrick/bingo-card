import BingoCardPage from "./pages/BingoCardPage/BingoCardPage";
import NumberPickerPage from "./pages/NumberPickerPage/NumerPickerPage";

const routes = [
    { name: 'Bingo Card Page', path: '', element: <BingoCardPage /> },
    { name: 'Number Picker Page', path: '/number-picker', element: <NumberPickerPage /> },
]

export default routes;