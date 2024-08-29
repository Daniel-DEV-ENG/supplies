import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import HomeTab from './tabs/home/HomeTab';
import TeamTab from './tabs/team/TeamTab';
import BudgetTab from './tabs/budget/BudgetTab';
import { useGetProjectDashboardWidgetsQuery } from './ProjectDashboardApi';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`
	}
}));

/**
 * The ProjectDashboardApp page.
 */
function ProjectDashboardApp() {
	const { isLoading } = useGetProjectDashboardWidgetsQuery();
	const [tabValue, setTabValue] = useState(0);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<Root
			header={<ProjectDashboardAppHeader />}
			content={
				<div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
					{/* المحتوى التسويقي يبدأ هنا */}
					<div className="marketing-content">
						<h2>🎉 مرحبًا بعودتكم!</h2>
						<p>نحن سعداء بوجودك هنا مرة أخرى. لوحة التحكم الخاصة بنا هي المكان المثالي لإدارة كل شيء يتعلق بمشروعك بكفاءة وسهولة.</p>
						
						<h3>📊 نظرة عامة سريعة:</h3>
						<ul>
							<li><strong>متابعة الأداء:</strong> تتبع أداء فريقك وميزانيتك بسهولة من خلال الرسوم البيانية والبيانات الحية.</li>
						</ul>
						
						<h3>🚀 استفد من الميزات المميزة:</h3>
						<ul>
							<li><strong>تعاون فعال:</strong> تعاون مع فريقك بشكل أكثر فعالية مع ميزات التواصل المدمجة.</li>
							<li><strong>تتبع الميزانية:</strong> حافظ على ميزانيتك تحت السيطرة مع تحليلات مخصصة وتقارير مفصلة.</li>

						</ul>

						<h3>🌟 نصائح لتحسين تجربتك:</h3>
						<ul>
							<li><strong>تابع كل جديد:</strong> قم بتخصيص لوحة التحكم الخاصة بك وفقًا لاحتياجاتك واحتياجات فريقك.</li>
							<li><strong>استخدم التقارير الدورية:</strong> استخدم تقاريرنا المخصصة لتحليل الأداء واتخاذ قرارات مدروسة.</li>
							<li><strong>استكشف الميزات الجديدة:</strong> تحقق من التحديثات الدورية والميزات الجديدة التي نضيفها لتحسين تجربتك.</li>
						</ul>

					
					</div>
					{/* المحتوى التسويقي ينتهي هنا */}
				</div>
			}
		/>
	);
}

export default ProjectDashboardApp;
