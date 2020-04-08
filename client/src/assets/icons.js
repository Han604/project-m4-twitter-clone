import React from 'react'
import Icon from 'react-icons-kit'
import {home} from 'react-icons-kit/feather/home'
import {bell} from 'react-icons-kit/feather/bell'
import {user} from 'react-icons-kit/feather/user'
import {bookmark} from 'react-icons-kit/feather/bookmark'
import {heart} from 'react-icons-kit/feather/heart'
import {repeat} from 'react-icons-kit/feather/repeat'
import {messageCircle} from 'react-icons-kit/feather/messageCircle'
import {share} from 'react-icons-kit/feather/share'
import {calendar} from 'react-icons-kit/feather/calendar'
import {mapPin} from 'react-icons-kit/feather/mapPin'

export const IconCalendar = () => <Icon icon={calendar} />
export const IconPin = () => <Icon icon={mapPin} />
export const IconHeart = () => <Icon icon={heart} />
export const IconRetweet = () => <Icon icon={repeat} />
export const IconMessage = () => <Icon icon={messageCircle} />
export const IconShare = () => <Icon icon={share} />
export const IconHome = () => <Icon icon={home} />
export const IconUser = () => <Icon icon={user} />
export const IconBell = () => <Icon icon={bell} />
export const IconMark = () => <Icon icon={bookmark} />
