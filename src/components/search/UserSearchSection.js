import React, { useEffect, useReducer } from 'react';
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { userApis } from '../../api';

import { LoadingSpinner } from '../../assets/icons/common';

import { BackButtonHeader, NonePlaceHolder } from '../common';
import { MonsterListItem } from '../monster';

import { BAD_REQUEST } from '../../constants/statusCode';
import { NOT_FOUND_USER_VIA_MONSTER_CODE } from '../../constants/statusMessage';

import { useDebounceInput } from '../../hooks';

function searchReducer(state, action) {
  switch (action.type) {
    case 'idle': {
      return searchInitialState;
    }
    case 'started': {
      return { ...state, status: 'pending' };
    }
    case 'success': {
      return {
        ...state,
        status: 'resolved',
        searchResult: action.searchResult,
      };
    }
    case 'fail': {
      return { ...state, status: 'rejected', failMessage: action.failMessage };
    }

    default: {
      throw new Error(`다루지 않고 있는 액션 타입입니다. ${action.type}`);
    }
  }
}

const searchInitialState = {
  status: 'idle',
  searchResult: null,
  failMessage: null,
};

const UserSearchSection = () => {
  const [
    monsterCode,
    debouncedMonsterCode,
    handleMonsterCodeChange,
    imperativelyChangeMonsterCode,
  ] = useDebounceInput('', 1000);

  const [state, dispatch] = useReducer(searchReducer, searchInitialState);
  const { path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const prevStack = location.state?.prev;

  useEffect(() => {
    const queryUser = async () => {
      if (!debouncedMonsterCode) {
        return;
      }

      if (debouncedMonsterCode && debouncedMonsterCode.length < 6) {
        dispatch({
          type: 'fail',
          failMessage: '몬스터 코드를 최소 6자 입력해주세요',
        });
        return;
      }

      try {
        const { data } = await userApis.searchUser(debouncedMonsterCode);

        if (
          data.statusCode === BAD_REQUEST &&
          data.responseMessage === NOT_FOUND_USER_VIA_MONSTER_CODE
        ) {
          dispatch({
            type: 'fail',
            failMessage: '검색한 유저를 찾지 못했어요',
          });
          return;
        }

        dispatch({
          type: 'success',
          searchResult: data.userInfo,
        });
      } catch (error) {
        console.error(error);
        dispatch({
          type: 'fail',
          failMEssage:
            '알 수 없는 에러가 발생했어요. 우측 버튼을 눌러 다시 검색해보세요.',
        });
      }
    };
    queryUser();
  }, [debouncedMonsterCode]);

  const { status, searchResult, failMessage } = state;

  return (
    <>
      <Header>
        <BackButtonHeader
          onButtonClick={() => history.replace(prevStack.pop())}
        >
          <InputSection>
            <SearchInput
              type="text"
              value={monsterCode}
              onChange={(event) => {
                dispatch({
                  type: event.target.value.length ? 'started' : 'idle',
                });
                handleMonsterCodeChange(event);
              }}
              placeholder="최소 6자 이상의 몬스터 코드를 입력하세요"
            />
            {status === 'pending' && (
              <LoadingSpinner
                width="24px"
                height="24px"
                style={{ position: 'relative', right: '8px' }}
              />
            )}
            {status !== 'idle' && status !== 'pending' && (
              <CancelButton
                onClick={() => {
                  imperativelyChangeMonsterCode('');
                  dispatch({
                    type: 'idle',
                  });
                }}
              >
                <div>
                  <div></div>
                  <div></div>
                </div>
              </CancelButton>
            )}
          </InputSection>
        </BackButtonHeader>
        {status === 'idle' || status === 'pending' ? null : status ===
          'rejected' ? (
          <SearchFailSection>
            <NonePlaceHolder>
              <span>{failMessage}</span>
            </NonePlaceHolder>
          </SearchFailSection>
        ) : (
          <ul>
            <MonsterListItem
              nickName={searchResult.nickName}
              monsterCode={searchResult.monsterCode}
              isFollowed={searchResult.isFollowed}
              monsterId={searchResult.monsterId}
              path={`${path}/${searchResult.monsterCode}`}
            />
          </ul>
        )}
      </Header>
    </>
  );
};

const Header = styled.div`
  margin: 24px 0;
  position: relative;
`;

const InputSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border-radius: 4px;
  margin-right: 8px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 14px 12px;
  background: inherit;
  border: none;

  color: var(--color-deemed);
  position: relative;

  &::placeholder {
    font-size: 13px;
    line-height: 16px;
    font-weight: var(--weight-regular);
    color: var(--color-deemed);
  }

  &:focus {
    outline: none;
  }
`;

const CancelButton = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  right: 8px;
  cursor: pointer;

  & > div {
    width: 18px;
    height: 18px;
    background: #999999;
    border-radius: 99em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
      width: 7.66px;
      height: 2.12px;
      background: var(--bg-primary);
      border-radius: 99em;
      position: absolute;

      &:first-child {
        transform: rotate(45deg);
      }
      &:last-child {
        transform: rotate(135deg);
      }
    }
  }
`;

const SearchFailSection = styled.div`
  height: 145px;
  margin-top: 48px;
  position: relative;
`;

export default UserSearchSection;
