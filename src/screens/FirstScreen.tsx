import React, {FC, useCallback, useEffect, useState} from 'react';
import {RefreshControl, ScrollView, Text} from "react-native";
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {ErrorText, FlexStartCenterView, ScreenCenterView} from "../styled";
import * as listAPI from "../api/modules/list";
import {GitHubListItem, ListRequestParams} from "../definitions/list";
import {HttpError} from "../api";
import List from "../components/List";
import useTimer from "../hooks/useTimer";


const DEFAULT_PARAMS: ListRequestParams = {
    per_page: 10,
    page: 1
}
const MAX_SECONDS = 10

type FirstScreenProps = {
    timer: {
        seconds: number;
        reset: () => void;
        toggle: (toggle: boolean) => void;
    }

}

const FirstScreen: FC = () => {
    const [list, setList] = useState<GitHubListItem[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [refreshing, setRefreshing] = useState(false)
    const timer = useTimer(30)
    // const [timerSeconds, setTimerSeconds] = useState(0)
    // const [isActive, setIsActive] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            timer.toggle(true)
            handleRequest().then()
        } else {
            timer.toggle(false)
        }
    }, [isFocused]);



    useEffect(() => {
        console.log(timer.seconds)
        if ( timer.seconds >= MAX_SECONDS) {
            handleRequest().then()
            timer.reset()
        }
    }, [timer.seconds])

    // const toggleTimer = (isActive: boolean) => {
    //     setIsActive(isActive)
    // }
    //
    // const reset = () => {
    //     setTimerSeconds(0)
    // }

    const sendRequest = async () => {
        setError("")
        const list = await listAPI.get(DEFAULT_PARAMS)

        if (list instanceof HttpError) {
            setError(list.message)
            return
        }

        setList(list);
    }

    const handleRequest = async () => {
        setIsLoading(true)
        await sendRequest()
        setIsLoading(false)
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await sendRequest()
        setRefreshing(false)
        timer.reset()
    }

    if (isLoading) {
        return <ScreenCenterView>
            <Text>Loading...</Text>
        </ScreenCenterView>
    }

    return <>
        <Text>{timer.seconds}</Text>

        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {error && <ErrorText>{error}</ErrorText>}
            <List items={list}/>
        </ScrollView>
    </>
}

export default FirstScreen
