import React from 'react';
import Block from "../Block/Block";

import Badge from "../Badge/Badge";

let lockImg = <img width={12} height={12} src={"/files/lock.svg"}></img>

const AccountRequest = () => {
    return (
        <div>
            <Block>Учетная деятельность
                <Badge badgeContent={lockImg} badgeColor='bg-success'>
                    <div>hellodalksdjlkasjdlkasjdlkasjdlkasdj</div>
                </Badge>
            </Block>
        </div>
    );
};

export default AccountRequest;