import { selector, selectorFamily } from 'recoil';
import userAtom from '.';
import { getUserByName } from '../../api/user';

/**
 * 비동기요청
 * selectorFamily는 selector와 같이 동일한 기능을 수행하되 파라미터에 따라 결과를 달리할 때 유용하다
 * selector와 selectorFamily 모두 캐시를 사용
 * 입력값이 동일한 경우에는 get 메서드를 다시 실행하지 않고 캐시에 있는 값을 반환 -> react query 같다.
 * selector와 selectorFamily 두 방식의 차이는 파라미터의 유무
 */
export const getUser = selectorFamily({
  key: 'user',
  get: (userName) => async () => {
    if (!userName) return null;
    const { data } = await getUserByName(userName);
    console.log('user', data);
    return data;
  },
});
