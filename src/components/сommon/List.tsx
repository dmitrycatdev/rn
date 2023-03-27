import React, {FC} from 'react';
import styled from "styled-components/native";
import {GitHubListItem} from "../definitions/list";
import {Image, Text, View} from "react-native";
import {FlexColumnView,  FlexStartView} from "../styled";
import {isIos} from "../utils";

const Avatar = styled(Image)`
  height: ${50};
  width: ${50};
  border-radius: ${100};
  ${_ => isIos() ? " border: 1px solid black;" : ""}
  border: 1px solid black;
  margin-right: ${20};
`

const ListItem = styled(View)`
  margin: ${10}px;
  background-color: white;
  flex-direction: row;
  padding: ${10}px;
  border-radius: ${10};

`
const SubText = styled(Text)`
  color: darkgray;
  font-size: ${10};
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
