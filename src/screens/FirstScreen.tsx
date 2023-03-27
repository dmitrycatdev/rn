import React, { FC, useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { ErrorText, ScreenCenterView } from '../styled'
import { ListRequestParams } from '../definitions/GitHubList'
import List from '../components/сommon/List'
import useTimer from '../hooks/useTimer'
import { useLazyGetGitHubListQuery } from '../api'
import { isErrorWithMessage, isFetchBaseQueryError } from '../utils'

const DEFAULT_PARAMS: ListRequestParams = {
    per_page: 25,
    page: 1,
}
const MAX_SECONDS = 30

const FirstScreen: FC = () => {
    const timer = useTimer(MAX_SECONDS)

    const [getList, { data: list, isLoading, isError, error }] =
        useLazyGetGitHubListQuery()

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            getList(DEFAULT_PARAMS)
            timer.toggle(true)
        } else {
            timer.toggle(false)
        }
    }, [isFocused])

    useEffect(() => {
        console.log(timer.seconds)
        if (timer.seconds >= MAX_SECONDS) {
            getList(DEFAULT_PARAMS)
            timer.reset()
        }
    }, [timer.seconds])

    const onRefresh = async () => {
        getList(DEFAULT_PARAMS)
        timer.reset()
    }

    if (isLoading) {
        return (
            <ScreenCenterView>
                <Text>Loading...</Text>
            </ScreenCenterView>
        )
    }

    const ErrorNotify = (): JSX.Element => {
        let message = 'Something went wrong.'

        if (isFetchBaseQueryError(error)) {
            message =
                'error' in error ? error.error : JSON.stringify(error.data)
        } else if (isErrorWithMessage(error)) {
            message = error.message
        }
        return <ErrorText>{message}</ErrorText>
    }

    return (
        <>
            <Text>Seconds: {timer.seconds}</Text>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={onRefresh} />
                }
            >
                {isError && ErrorNotify()}
                <List items={list} />
            </ScrollView>
        </>
    )
}

export default FirstScreen
