import React from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
export default function Home() {
    let but = {
        margin: '40px'
    }
    function go(){
        window.location.href = 'http://localhost:3000/发票管理.html'
    }
    return (
        <div>
            <Button onClick={go} style={but} colorScheme='blue'>制作Invoice</Button>
        </div>
    )
}
