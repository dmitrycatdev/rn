import React, {FC} from 'react';
import styled from "styled-components/native";
import {GitHubListItem} from "../definitions/list";
import {Image, Text, View} from "react-native";
import {FlexColumnView,  FlexStartView} from "../styled";

const Avatar = styled(Image)`
  height: 50px;
  width: 50px;
  border-radius: 100px;
  border: 1px solid black;
  margin-right: 20px;
`

const ListItem = styled(View)`
  margin: 10px;
  background-color: white;
  flex-direction: row;
  padding: 10px;
  border-radius: 10px;

`
const SubText = styled(Text)`
  color: darkgray;
  font-size: 10em;
`

type ListProps = {
    items: GitHubListItem[];
}

const List: FC<ListProps> = ({items}: ListProps) => {
    return <>
        {
            items.map(item => {
                return <ListItem key={item.id}>
                    <FlexStartView>
                        <Avatar source={{uri: item.actor.avatar_url}}/>
                    </FlexStartView>
                    <FlexColumnView>
                        <Text>{item.actor.display_login}</Text>
                        <SubText>id: {item.id}</SubText>
                    </FlexColumnView>

                </ListItem>
            })
        }
    </>
}

export default React.memo(List);
