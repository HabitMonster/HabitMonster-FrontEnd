// import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import { babyMonsterState, selectedMonster } from '../recoil/states/monster';

// import styled from 'styled-components';

// import { AvatarThumbnail } from '../components/avatar';
// import { monsterApis } from '../api/index';
// import { fontSize } from '../styles';

// import {
//   babyMonOrange,
//   babyMonBlue,
//   babyMonGreen,
//   babyMonPink,
//   babyMonRed,
//   babyMonYellow,
// } from '../assets/images/monsters';

// const AVATAR_MOCK_LIST = [
//   {
//     imageUrl: babyMonGreen,
//     imageAlt: '녹색이',
//     monsterId: 'Lv1-green',
//   },
//   {
//     imageUrl: babyMonPink,
//     imageAlt: '부농이',
//     monsterId: 'Lv1-pink',
//   },
//   {
//     imageUrl: babyMonBlue,
//     imageAlt: '파랑이',
//     monsterId: 'Lv1-blue',
//   },
//   {
//     imageUrl: babyMonYellow,
//     imageAlt: '노랑이',
//     monsterId: 'Lv1-yellow',
//   },
//   {
//     imageUrl: babyMonOrange,
//     imageAlt: '주황이',
//     monsterId: 1,
//   },
//   {
//     imageUrl: babyMonRed,
//     imageAlt: '빨강이',
//     monsterId: 'Lv1-red',
//   },
// ];

// const Avatar = () => {
//   const avatarList = useRecoilValue(babyMonsterState);
//   const [selectedMonster, setSelectedMonster] = useRecoilState(
//     AVATAR_MOCK_LIST[0],
//   );
//   // const [selectedMonster, setSelectedMonster] =
//   //   useRecoilState(selectedMonster);
//   const history = useHistory();

//   const selectAvatar = (avatar) => {
//     setSelectedMonster(avatar);
//   };

//   return (
//     <AvatarContainer>
//       <AvatarWrap>
//         <TitleWrap>
//           <WeightText>반가워요!</WeightText>
//           <Title>나만의 몬스터를 골라주세요!</Title>
//           <Description>
//             한 번 고른 몬스터는 변경이 어려우니 신중히 골라주세요.
//           </Description>
//         </TitleWrap>
//         <ThumbnailWrap>
//           <AvatarThumbnail
//             imageUrl={selectedMonster.imageUrl}
//             imageAlt={selectedMonster.imageAlt}
//             imageSize={'large'}
//           />
//         </ThumbnailWrap>
//         <SelectList>
//           {AVATAR_MOCK_LIST.map((avatar) => {
//             return (
//               <SelectListItem
//                 key={avatar.imageUrl}
//                 selected={selectedMonster.imageUrl === avatar.imageUrl}
//                 onClick={() => selectAvatar(avatar)}
//               >
//                 <AvatarThumbnail
//                   imageUrl={avatar.imageUrl}
//                   imageAlt={avatar.imageAlt}
//                   imageSize={'small'}
//                 />
//               </SelectListItem>
//             );
//           })}
//         </SelectList>
//       </AvatarWrap>
//       <FixedButton
//         onClick={() => {
//           history.push('/select');
//         }}
//       >
//         선택하기
//       </FixedButton>
//     </AvatarContainer>
//   );
// };

// export default Avatar;

// const AvatarContainer = styled.div`
//   font-family: var(--font-name-apple);
//   width: 100%;
//   height: 100%;
// `;

// const AvatarWrap = styled.div`
//   /* background-color: var(--color-login-bg); */
//   background-color: #070707;
//   padding: 6% 24px 10%;
//   width: 100%;
//   padding: 75px 24px 100px;
// `;

// const TitleWrap = styled.div``;

// const Title = styled.h2`
//   color: var(--color-white);
//   font-size: var(--font-semi-medium);
//   font-weight: var(--weight-bold);
//   line-height: 32px;
// `;

// const WeightText = styled.span`
//   color: var(--color-white);
//   font-size: var(--font-semi-medium);
//   font-weight: var(--weight-regular);
//   line-height: 32px;
// `;

// const Description = styled.p`
//   color: var(--color-white);
//   ${fontSize('13px')};
//   font-weight: var(--weight-regular);
//   margin-top: 12px;
// `;

// const ThumbnailWrap = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 30px 0 30px;
// `;

// const SelectList = styled.ul`
//   display: flex;
//   justify-content: center;
//   /* display: grid;
//   gap: 6px;
//   margin: 0 auto;
//   grid-template-columns: repeat(3, 1fr);
//   max-width: 204px; */
// `;

// const SelectListItem = styled.li`
//   border: 1px solid
//     ${(props) => (props.selected ? 'var(--color-white)' : 'transparent')};
//   border-radius: var(--border-radius-avatarItem);
//   cursor: pointer;
//   transition: border 500ms;
// `;

// const InputWrap = styled.div`
//   border: 2px solid var(--color-white);
//   border-radius: var(--border-radius-mideum);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   max-width: 277px;
//   height: 46px;
//   margin: 50px auto;
// `;

// const NameInput = styled.input`
//   border: 0;
//   background: none;
//   color: var(--color-white);
//   font-size: var(--font-regular);
//   font-weight: bold;
//   line-height: 22px;
//   outline: 0;
//   text-align: center;

//   &::placeholder {
//     color: rgba(255, 255, 255, 0.4);
//   }
// `;

// const FixedButton = styled.button`
//   /* background-color: var(--color-main); */
//   background-color: #4d0dcd;
//   border: 0;
//   outline: 0;
//   color: var(—color-white);
//   font-size: var(—font-regular);
//   font-weight: var(—weight-bold);
//   line-height: 22px;
//   text-align: center;
//   position: fixed;
//   left: 50%;
//   bottom: 0;
//   transform: translateX(-50%);
//   height: 64px;
//   width: 100%;
//   max-width: 375px;
// `;
