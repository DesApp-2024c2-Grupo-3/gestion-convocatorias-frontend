import React from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PodcastIcon from "@mui/icons-material/Podcasts";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HomeIcon from '@mui/icons-material/Home';
import { Link, NavLink } from "react-router-dom";
import { FormatListNumbered } from "@mui/icons-material";

interface SideBarListProps {
    ItemIcon: React.ReactNode;
    ItemText: string;
    ItemIndex: number;
    selectedIndex: number | null;
    setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
    navigateTo: string
}

export const SideBarItem = ({ ItemIcon, ItemText, ItemIndex, selectedIndex, setSelectedIndex, navigateTo }: SideBarListProps) => {

    const handleListItemClick = () => {
        setSelectedIndex(ItemIndex);
    };

    return (
        <ListItem disablePadding sx={{
            ":hover": {
                backgroundColor: '#06A3C9',
                color: 'white'
            },
            ":checked": {
                backgroundColor: '#56A42C'
            }
            }}
        >
            <ListItemButton
                component={Link} to={navigateTo}
                selected={selectedIndex === ItemIndex}
                onClick={handleListItemClick}
                sx={{
                    "&.Mui-selected": {
                        backgroundColor: '#56A42C',
                        color: 'white'
                    }
                }}
            >
                <ListItemIcon>
                    {ItemIcon}
                </ListItemIcon>
                <ListItemText primary={ItemText} />
            </ListItemButton>
        </ListItem>
    )
};

export const Items = [
    {
        ItemIcon: <PodcastIcon />,
        ItemText: 'Convocatorias',
        navigateTo: '/Convocatorias'
    },
    {
        ItemIcon: <FormatListNumbered />,
        ItemText: 'Formatos',
        navigateTo: '/Formatos'
    }
];