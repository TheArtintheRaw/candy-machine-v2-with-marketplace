import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Link } from 'react-router-dom';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import CurrencyToggle from './CurrencyToggle';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import headerimg from '../img/header.png';
import styled from 'styled-components';

interface TopNavProps {
    showCurrencyToggle?: boolean;
}

const TopNav: React.FC<TopNavProps> = ({ showCurrencyToggle = false }) => {
    const wallet = useAnchorWallet();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLLIElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: any) => {
        if (
            anchorRef?.current &&
            (anchorRef.current as any).contains(event.target)
        ) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            if (anchorRef.current !== null) anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <HeaderBar>
            <DropdownAnchor ref={anchorRef} onClick={handleToggle}>
                MARKET MENU
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    onKeyDown={handleListKeyDown}>
                                    <MenuItem>
                                        <Link to='/'>HOME</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to='/marketplace'>
                                            MARKETPLACE
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to='/sell'>SELL</Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <a href='https://stake.cardinal.so/glc'>
                                            STAKING
                                        </a>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    )}
                </Popper>
            </DropdownAnchor>
            <Logo>
                <a href='https://ghostlifeclub.com'>
                    <img alt='headerimg' src={headerimg} />
                </a>
            </Logo>
            <Menu>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                <li>
                    <Link to='/marketplace'>MARKETPLACE</Link>
                </li>
                <li>
                    <Link to='/sell'>SELL</Link>
                </li>
                <li>
                    <a href='https://stake.cardinal.so/glc'>STAKING</a>
                </li>
            </Menu>
            {showCurrencyToggle && <CurrencyToggle />}
            <Wallet>
                {wallet ? (
                    <ConnectButton />
                ) : (
                    <ConnectButton>Connect Wallet</ConnectButton>
                )}
            </Wallet>
        </HeaderBar>
    );
};

const HeaderBar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
`;

const DropdownAnchor = styled.li`
    cursor: pointer;
    display: none;

    @media screen and (max-width: 768px) {
        display: flex;
        flex: 0 0 auto;
        position: fixed;
        top: 10%;
        left: 30%;
        transform: translate(-100%, 60%);
    }
    font-size: 1.5rem;
    cursor: pointer;
    color: #e6e3e3;
    text-decoration: underline;
    text-shadow: 0 0 50 50 #ffffff;
    padding: 10;
    &:hover {
        color: rgb(131, 146, 161);
    }

    > div {
        z-index: 1000;
    }

    .MuiList-root {
        margin-top: 15px;
        background-color: #7c7b7b;

        a {
            padding-top: 4px;
            padding-bottom: 4px;
            font-weight: 1000;
            &:hover {
                border-bottom: 0px;
                color: #02ff8978;
            }
        }
    }
`;

// const WalletAmount = styled.div`
//   color: black;
//   width: auto;
//   padding: 5px 5px 5px 16px;
//   min-width: 48px;
//   min-height: auto;
//   border-radius: 22px;
//   background-color: var(--main-text-color);
//   box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
//     0px 1px 18px 0px rgb(0 0 0 / 12%);
//   box-sizing: border-box;
//   transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
//     box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   font-weight: 500;
//   line-height: 1.75;
//   text-transform: uppercase;
//   border: 0;
//   margin: 0;
//   display: inline-flex;
//   outline: 0;
//   position: relative;
//   align-items: center;
//   user-select: none;
//   vertical-align: middle;
//   justify-content: flex-start;
//   gap: 10px;
// `

const Wallet = styled.ul`
    flex: 0 0 auto;
    margin: 0;
    padding: 0;
`;

const ConnectButton = styled(WalletMultiButton)`
    border-radius: 18px !important;
    padding: 6px 16px;
    background-color: #4e44ce;
    margin: 0 auto;
`;

const Logo = styled.div`
    flex: 0 0 auto;
    margin-right: 10px;

    img {
        height: 60px;
    }
`;

const Menu = styled.ul`
    list-style: none;
    display: inline-flex;
    flex: 1 0 auto;
    margin-bottom: 0;

    @media screen and (max-width: 768px) {
        display: none;
    }

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
    li {
        margin: 0 12px;

        a {
            color: var(--main-text-color);
            list-style-position: outside;
            list-style-type: none;
            list-style-image: none;
            outline-color: #000000;
            text-decoration: none;
            text-size-adjust: 100%;
            touch-action: manipulation;
            transition: color 0.3s;
            padding-bottom: 15px;
            text-emphasis-style: initial;

            img {
                max-height: 26px;
            }
        }

        a:hover,
        a:active {
            color: rgb(131, 146, 161);
            border-bottom: 4px solid var(--title-text-color);
        }
    }
`;

export default TopNav;
