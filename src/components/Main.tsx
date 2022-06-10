import React from 'react';
import { Box, Text, Flex, Heading, VStack, Image, Button, SlideFade, Menu, Tooltip, Textarea } from '@chakra-ui/react';
import {CheckIcon} from '@chakra-ui/icons'; 
import { animationDelay, BlueBG, defaultBG, lightThemeGrad } from '../Util/constants';
import { getAreas } from './hooks/getAreas';



const Center = () => {  
    const [input, setInput] = React.useState(''); 
    const handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setInput(inputValue)
    }
    const downloadFile = async (jsonData) => {
        const myData = jsonData;
        const fileName = "react-img-mapper-data";
        const json = JSON.stringify(myData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const handleDownload = async (res) => {
        await downloadFile(res); 
    }
    
    return (
        <VStack 
            w="full" spacing={10}
            h="full" justifyContent={'center'}
            alignItems='center'>
            <Heading textColor={BlueBG} > Area tags to React-Img-Mapper Data </Heading>

            <Flex flexDirection={'column'}
                  align="center" 
                  justifyContent={"space-around"} px={10} py={10}
                  bg={BlueBG} w={{base: "sm", md: "lg"}} h={{base: "sm", md: "md"}} shadow='md' borderRadius={"50"} borderWidth='1px' >
                <Heading fontSize={"2xl"}> Input your area tags here: </Heading>
                <Textarea value={input} onChange={handleInputChange} placeholder='Area tags.....' />
                <Flex align={'center'}>
                    <Button onClick={() => handleDownload(getAreas(input))} > Generate React-Img-Map Data </Button>
                </Flex>
            </Flex>

                           
        </VStack>
    )
}

export const Main = ({}) => {
    return (
        <Flex h={{base: "95vh", xl: '95vh'}}  bg={defaultBG}  direction={{base: "column", md: "row"}}>
            <Center />      
        </Flex> 
    );
}

