import MultiSidebar from "./MultiSidebar";
import {useGlobalContext} from "../Context/Context";

const NewGroup = () => {
    const {closeNewGroupSidebar} = useGlobalContext();
    return(
        <MultiSidebar heading="New Group" onClose={closeNewGroupSidebar}>

        </MultiSidebar>
    )
}

export default NewGroup;