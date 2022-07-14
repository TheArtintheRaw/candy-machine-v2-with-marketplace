import Stack from '@mui/material/Stack';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import { styled } from '@mui/material';

export const CTAButton = styled(CrossmintPayButton)`
    text-decoration-style: solid;
    text-transform: uppercase;

    button.my-custom-crossmint-button {
        background: linear-gradient(
            90deg,
            rgb(182, 32, 252) 0%,
            rgb(0, 0, 0) 35%,
            rgb(28, 211, 150) 100%
        );
        justify-content: center;
        font-family: 'Playfair';
        font-weight: 1000;
    }
`;

export function CrossmintButton() {
    return (
        <Stack direction='row' spacing={2}>
            <CTAButton
                collectionTitle='GLC SOLtergeists'
                collectionDescription='Ghostlife Club SOLtergeists collection of 4444 NFTs granting membership and exclusive staking rights to our $pirit coin'
                collectionPhoto='https://ghostlifeclub.mypinata.cloud/ipfs/QmSj9GspiAg2mVgkDxxSqdMEuQWwt1v6DWH68BMjeTQRNr'
                clientId='b455eca8-b053-4746-abb2-c18ae90ea059'
                mintConfig={{ type: 'candy-machine' }}
                paymentMethod='ETH'
                className='button.my-custom-crossmint-button'>
                ETH
            </CTAButton>
            <CTAButton
                collectionTitle='GLC SOLtergeists'
                collectionDescription='Ghostlife Club SOLtergeists collection of 4444 NFTs granting membership and exclusive staking rights to our $pirit coin'
                collectionPhoto='https://ghostlifeclub.mypinata.cloud/ipfs/QmSj9GspiAg2mVgkDxxSqdMEuQWwt1v6DWH68BMjeTQRNr'
                clientId='b455eca8-b053-4746-abb2-c18ae90ea059'
                mintConfig={{ type: 'candy-machine' }}
                className='button.my-custom-crossmint-button'>
                USD
            </CTAButton>
        </Stack>
    );
}
