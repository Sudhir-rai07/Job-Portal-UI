import { ReactElement } from "react"
import { AiFillProduct } from "react-icons/ai"
import { BiBookContent } from "react-icons/bi"
import { FaHome } from "react-icons/fa"
import { GiHumanPyramid } from "react-icons/gi"
import { GrCloudSoftware } from "react-icons/gr"
import { MdManageAccounts, MdOutlineCrisisAlert } from "react-icons/md"
import { RiMoneyCnyBoxFill } from "react-icons/ri"
import { SiCoinmarketcap } from "react-icons/si"

type CategoryType = {
    icon: ReactElement,
    name: string
}

const categoryData : CategoryType[] = [
    {icon: <AiFillProduct />, name:"Retail & Product"},
    {icon: <BiBookContent />, name:"Content Writer"},
    {icon: <GiHumanPyramid />, name:"Human Resource"},
    {icon: <SiCoinmarketcap />, name:"Market Research"},
    {icon: <GrCloudSoftware />, name:"Softwaret"},
    {icon: <RiMoneyCnyBoxFill />, name:"Finance"},
    {icon: <MdManageAccounts />, name:"Management"},
    {icon: <MdOutlineCrisisAlert />, name:"Marketing & Sale"},
]
export default categoryData