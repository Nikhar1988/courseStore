import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import { Button, Htag, Input, P, Rating, Tag, Textarea } from '../components';
import { withLayout } from '../layout/Layout';
import axios from 'axios';
import { MenuItem } from '../interfaces/menu.interface';
import { API } from '../helpers/api';


function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(4);
 
	return (
		<>
			<Htag tag='h1'>Заголовок</Htag>
			<Button appearance='primary' arrow='right'>Кнопка</Button>
			<Button appearance='ghost' arrow='down'>Кнопка</Button>
			<P size='l'>Большой</P>
			<P>Средний</P>
			<P size='s'>Маленький</P>
			<Tag size='s'>Ghost</Tag>
			<Tag size='m' color='red'>Red</Tag>
			<Tag size='s' color='green'>Green</Tag>
			<Tag color='primary'>Green</Tag>
			<Rating rating={rating} isEditable setRating={setRating} />
			<Input placeholder='text'/>
			<Textarea placeholder='text'/>
			
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory
	});
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}


//https://courses-top.ru/api/top-page/find
//https://github.com/AlariCode/top-app-demo
// https://www.figma.com/file/eHIyKZXUUtMf1BQiuv6tTA/%D0%9A%D1%83%D1%80%D1%81-2---NextJS?node-id=1%3A2