import React, { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MODULE_SLUG, PERMISSION_SLUG, OPERATIONS } from "../config/constants";
import { LOCATIONS } from "../config/routeConfig";
import { makePermissionChecker, PermissionHelper } from "../helper/AuthHelper";

/* Layouts */
import GuestLayout from "../layout/GuestLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

/* Pages */
// verify business email for testing purspose
const VerifyBusinessEmail = lazy(() => import("../components/pages/verifyBusinessEmail/Index"));

const Login = lazy(() => import("../components/pages/Auth/Login"));
const Signup = lazy(() => import("../components/pages/Auth/Signup"));
const ForgetPassword = lazy(() => import("../components/pages/Auth/ForgetPassword"));
const Profile = lazy(() => import("../components/pages/Profile/Index"));

const Dashboard = lazy(() => import("../components/pages/Dashboard/Index"));

const AdminsList = lazy(() => import("../components/pages/Admin/Index"));
const RoleList = lazy(() => import("../components/pages/Role/Index"));
const FAQ = lazy(() => import("../components/pages/FAQs/Index"));
const FAQTypes = lazy(() => import("../components/pages/FAQs/Type/Index"));
const Policy = lazy(() => import('../components/pages/Policy/Index'));
const Designation = lazy(() => import("../components/pages/Designation/Index"));
const BusinessType = lazy(() => import("../components/pages/BusinessType/Index"));
const ColorList = lazy(() => import("../components/pages/Color/Index"));
const CategoryList = lazy(() => import("../components/pages/Category/Index"));
const SubCategory = lazy(() => import("../components/pages/Category/SubCategory/Index"));
const BankAccountList = lazy(() => import("../components/pages/BankAccount/Index"));
const StaticPage = lazy(() => import('../components/pages/StaticPages/Index'));
const UserManagement = lazy(() => import('../components/pages/UserManagement/Index'));
const AttributeList = lazy(() => import('../components/pages/Category/Attribute/index'))
const ProductList = lazy(() => import('../components/pages/Product/ProductList'));
const CategoryReturnPolicyList = lazy(() => import('../components/pages/CategoryReturnPolicy/CategoryReturnPolicyList.jsx'));
const EscalateIssueList = lazy(() => import('../components/pages/EscalateIssue'));
const BrandList = lazy(() => import('../components/pages/Brand'));
const BrandWiseSellerList = lazy(() => import("../components/pages/Brand/BrandWiseSellerList"))
const ShareFeedbackList = lazy(()=> import("../components/pages/ShareFeedback"));

const AddEditFaq = lazy(() => import('../components/pages/FAQs/AddEditFaq'));
const AddEditFaqType = lazy(() => import("../components/pages/FAQs/Type/AddEditFaqType"));
const AddEditPolicy = lazy(() => import('../components/pages/Policy/AddEditPolicy'));
const AddEditAdmin = lazy(() => import("../components/pages/Admin/AddEditAdmin"));
const AddEditRole = lazy(() => import("../components/pages/Role/AddEditRole"));
const AddEditColor = lazy(() => import("../components/pages/Color/AddEditColor"));
const AddEditCategory = lazy(() => import("../components/pages/Category/AddEditCategory"));
const AddEditBankAccount = lazy(() => import("../components/pages/BankAccount/AddEditBank"));
const AddEditStaticPage = lazy(() => import('../components/pages/StaticPages/AddEditStaticPage'));
const AddEditAttribute = lazy(() => import('../components/pages/Category/Attribute/AddEditAttribute'));
const AttributeInput = lazy(() => import("../components/pages/Category/Attribute/AttributeInput/AttributeInput"));
const CategoryReturnPolicyAddEdit = lazy(() => import("../components/pages/CategoryReturnPolicy/CategoryReturnPolicyAddEdit"))

const ViewFaq = lazy(() => import('../components/pages/FAQs/ViewFaq'));
const ViewPolicy = lazy(() => import('../components/pages/Policy/ViewPolicy'));
const ViewCategory = lazy(() => import("../components/pages/Category/ViewCategory"));
const ViewBankAccount = lazy(() => import("../components/pages/BankAccount/ViewBank"));
const ViewStaticPage = lazy(() => import('../components/pages/StaticPages/ViewStaticPage'));
const UserDetails = lazy(() => import('../components/pages/UserManagement/ViewUser/Index'));
const ProductDetail = lazy(() => import('../components/pages/Product/ProductDetail'));
const HSN = lazy(()=> import('../components/pages/HSN'));
const ViewCategoryReturnPolicy = lazy(() => import('../components/pages/CategoryReturnPolicy/CategoryReturnPolicyView'))


const SampleForm = lazy(() => import("../components/pages/Sample/Form"));

const routes = (loggedIn, userData) => {
  let roles = userData?.processedRoles;
  let { hasModulePermission, hasTypePermission } = makePermissionChecker(roles);
  const { getPermissionsForModule } = new PermissionHelper(roles)

  return [

    // verify business email for testing purspose
    {
      path: `business-email-verification`,
      element: <GuestLayout><VerifyBusinessEmail /></GuestLayout>,
    },
    // end verify business email for testing purspose


    {
      path: LOCATIONS.ROOT,
      element: !loggedIn ? <GuestLayout><Outlet /></GuestLayout> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
      children: [
        { path: LOCATIONS.LOGIN_ROUTE, element: <Login /> },
        {
          path: LOCATIONS.ROOT,
          element: <Navigate to={LOCATIONS.LOGIN_ROUTE} />,
        },
        { path: LOCATIONS.SIGN_UP_ROUTE, element: <Signup /> },
        { path: LOCATIONS.FORGET_PASSWORD_ROUTE, element: <ForgetPassword /> },
      ],
    },
    {
      path: LOCATIONS.ROOT,
      element: loggedIn ? <ProtectedLayout><Outlet /></ProtectedLayout> : <Navigate to={LOCATIONS.LOGIN_ROUTE} />,
      children: [
        { path: LOCATIONS.DASHBOARD_ROUTE.ROOT, element: <Dashboard /> },
        {
          path: LOCATIONS.ADMIN_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.ADMIN) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.ADMIN_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.ADMIN, PERMISSION_SLUG.LIST) ? <AdminsList permission={getPermissionsForModule(MODULE_SLUG.ADMIN)} /> : <Navigate to={LOCATIONS.ADMIN_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ADMIN_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.ADMIN, PERMISSION_SLUG.ADD) ? <AddEditAdmin operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.ADMIN_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ADMIN_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.ADMIN, PERMISSION_SLUG.EDIT) ? <AddEditAdmin operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.ADMIN_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.ROLE_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.ROLE) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.ROLE_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.ROLE, PERMISSION_SLUG.LIST) ? <RoleList permission={getPermissionsForModule(MODULE_SLUG.ROLE)} /> : <Navigate to={LOCATIONS.ROLE_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ROLE_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.ROLE, PERMISSION_SLUG.ADD) ? <AddEditRole operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.ROLE_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ROLE_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.ROLE, PERMISSION_SLUG.EDIT) ? <AddEditRole operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.ROLE_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.CATEGORY_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.CATEGORY) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.CATEGORY_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.LIST) ? <CategoryList permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.ADD) ? <AddEditCategory operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.CATEGORY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.EDIT) ? <AddEditCategory operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.CATEGORY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.VIEW) ? <ViewCategory /> : <Navigate to={LOCATIONS.CATEGORY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_ROUTES.SUBCATEGORY,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.LIST) ? <SubCategory permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} /> : <Navigate to={LOCATIONS.CATEGORY_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.BANK_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.BANK) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.BANK_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.BANK, PERMISSION_SLUG.LIST) ? <BankAccountList permission={getPermissionsForModule(MODULE_SLUG.BANK)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            },
            {
              path: LOCATIONS.BANK_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.BANK, PERMISSION_SLUG.ADD) ? <AddEditBankAccount operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.BANK_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.BANK_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.BANK, PERMISSION_SLUG.EDIT) ? <AddEditBankAccount operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.BANK_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.BANK_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.BANK, PERMISSION_SLUG.VIEW) ? <ViewBankAccount /> : <Navigate to={LOCATIONS.BANK_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.DESIGNATION_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.DESIGNATION) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.DESIGNATION_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.DESIGNATION, PERMISSION_SLUG.LIST) ? <Designation permission={getPermissionsForModule(MODULE_SLUG.DESIGNATION)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.BUSINESSTYPE_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.BUSINESSTYPE) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.BUSINESSTYPE_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.BUSINESSTYPE, PERMISSION_SLUG.LIST) ? <BusinessType permission={getPermissionsForModule(MODULE_SLUG.BUSINESSTYPE)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.COLOR_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.COLOR) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.COLOR_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.COLOR, PERMISSION_SLUG.LIST) ? <ColorList permission={getPermissionsForModule(MODULE_SLUG.COLOR)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            },
            {
              path: LOCATIONS.COLOR_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.COLOR, PERMISSION_SLUG.ADD) ? <AddEditColor operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.COLOR_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.COLOR_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.COLOR, PERMISSION_SLUG.EDIT) ? <AddEditColor operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.COLOR_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.SAMPLE_ROUTES.ROOT,
          element: <Outlet />,
          children: [
            {
              path: LOCATIONS.SAMPLE_ROUTES.FORM,
              element: <SampleForm />
            }
          ],
        },
        { path: LOCATIONS.PROFILE_ROUTES, element: <Profile /> },
        {
          path: LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT,
          element: hasModulePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.LIST) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE} />,
          children: [
            {
              path: LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.LIST) ? <FAQTypes permission={getPermissionsForModule(MODULE_SLUG.FAQ)} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            },
            {
              path: LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ADD,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.ADD) ? <AddEditFaqType operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            },
            {
              path: LOCATIONS.FAQ_ROUTES.FAQ_TYPE.EDIT,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.EDIT) ? <AddEditFaqType operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.FAQ_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.LIST) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE} />,
          children: [
            {
              path: LOCATIONS.FAQ_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.LIST) ? <FAQ permission={getPermissionsForModule(MODULE_SLUG.FAQ)} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            },
            {
              path: LOCATIONS.FAQ_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.ADD) ? <AddEditFaq operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            },
            {
              path: LOCATIONS.FAQ_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.EDIT) ? <AddEditFaq operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            },
            {
              path: LOCATIONS.FAQ_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.FAQ, PERMISSION_SLUG.VIEW) ? <ViewFaq /> : <Navigate to={LOCATIONS.FAQ_ROUTES.FAQ_TYPE.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.POLICY_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.POLICY) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.POLICY_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.POLICY, PERMISSION_SLUG.LIST) ? <Policy permission={getPermissionsForModule(MODULE_SLUG.POLICY)} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.ROOT} />,
            },
            {
              path: LOCATIONS.POLICY_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.POLICY, PERMISSION_SLUG.ADD) ? <AddEditPolicy operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.POLICY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.POLICY_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.POLICY, PERMISSION_SLUG.EDIT) ? <AddEditPolicy operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.POLICY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.POLICY_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.POLICY, PERMISSION_SLUG.VIEW) ? <ViewPolicy /> : <Navigate to={LOCATIONS.POLICY_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.STATIC_PAGES_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.STATIC_PAGE) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.STATIC_PAGES_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.STATIC_PAGE, PERMISSION_SLUG.LIST) ? <StaticPage permission={getPermissionsForModule(MODULE_SLUG.STATIC_PAGE)} /> : <Navigate to={LOCATIONS.FAQ_ROUTES.ROOT} />,
            },
            /*            {
                          path: LOCATIONS.STATIC_PAGES_ROUTES.ADD,
                          element: hasTypePermission(MODULE_SLUG.STATIC_PAGE,PERMISSION_SLUG.ADD) ? <AddEditStaticPage operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.STATIC_PAGES_ROUTES.ROOT} />
                        },
            */
            {
              path: LOCATIONS.STATIC_PAGES_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.STATIC_PAGE, PERMISSION_SLUG.EDIT) ? <AddEditStaticPage operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.STATIC_PAGES_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.STATIC_PAGES_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.STATIC_PAGE, PERMISSION_SLUG.VIEW) ? <ViewStaticPage /> : <Navigate to={LOCATIONS.STATIC_PAGES_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.USER_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.USER) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.USER_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.USER, PERMISSION_SLUG.LIST) ? <UserManagement permission={getPermissionsForModule(MODULE_SLUG.USER)} /> : <Navigate to={LOCATIONS.USER_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.USER_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.USER, PERMISSION_SLUG.VIEW) ? <UserDetails permission={getPermissionsForModule(MODULE_SLUG.USER)} /> : <Navigate to={LOCATIONS.USER_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.BRAND_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.BRAND) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.BRAND_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.BRAND, PERMISSION_SLUG.LIST) ? <BrandList permission={getPermissionsForModule(MODULE_SLUG.BRAND)} /> : <Navigate to={LOCATIONS.BRAND_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.BRAND_ROUTES.SELLERS_OF_BRAND.ROOT,
              element: hasTypePermission(MODULE_SLUG.BRAND, PERMISSION_SLUG.LIST) ? <BrandWiseSellerList permission={getPermissionsForModule(MODULE_SLUG.BRAND)} /> : <Navigate to={LOCATIONS.BRAND_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.ATTRIBUTE_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.CATEGORY) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.ATTRIBUTE_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.LIST) ? <AttributeList permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} /> : <Navigate to={LOCATIONS.ATTRIBUTE_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ATTRIBUTE_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.ADD) ? <AddEditAttribute permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.ATTRIBUTE_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ATTRIBUTE_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.EDIT) ? <AddEditAttribute permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.ATTRIBUTE_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.ATTRIBUTE_INPUTS_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.CATEGORY, PERMISSION_SLUG.ADD) ? <AttributeInput permission={getPermissionsForModule(MODULE_SLUG.CATEGORY)} /> : <Navigate to={LOCATIONS.ATTRIBUTE_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.PRODUCT_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.PRODUCT) ? <Outlet /> :<Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.PRODUCT_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.PRODUCT, PERMISSION_SLUG.LIST) ? <ProductList permission={getPermissionsForModule(MODULE_SLUG.PRODUCT)} /> :<Navigate to={LOCATIONS.PRODUCT_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.PRODUCT_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.PRODUCT, PERMISSION_SLUG.VIEW) ? <ProductDetail permission={getPermissionsForModule(MODULE_SLUG.PRODUCT)} /> : <Navigate to={LOCATIONS.PRODUCT_ROUTES.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.HSN_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.HSNCODE) ? <Outlet/> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
            path: LOCATIONS.HSN_ROUTES.ROOT,
            element: hasTypePermission(MODULE_SLUG.HSNCODE, PERMISSION_SLUG.LIST) ? <HSN permission={getPermissionsForModule(MODULE_SLUG.HSNCODE)} />: <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
           }
          ]
        },
        {
          path: LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.CATEGORY_RETURN_POLICY) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} /> ,
          children: [
            {
              path: LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY_RETURN_POLICY, PERMISSION_SLUG.LIST) ? <CategoryReturnPolicyList permission={getPermissionsForModule(MODULE_SLUG.CATEGORY_RETURN_POLICY)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ADD,
              element: hasTypePermission(MODULE_SLUG.CATEGORY_RETURN_POLICY, PERMISSION_SLUG.ADD) ? <CategoryReturnPolicyAddEdit operationType={OPERATIONS.ADD} /> : <Navigate to={LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.EDIT,
              element: hasTypePermission(MODULE_SLUG.CATEGORY_RETURN_POLICY, PERMISSION_SLUG.EDIT) ? <CategoryReturnPolicyAddEdit operationType={OPERATIONS.EDIT} /> : <Navigate to={LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ROOT} />
            },
            {
              path: LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.VIEW,
              element: hasTypePermission(MODULE_SLUG.CATEGORY_RETURN_POLICY, PERMISSION_SLUG.VIEW) ? <ViewCategoryReturnPolicy /> : <Navigate to={LOCATIONS.CATEGORY_RETURN_POLICY_ROUTES.ROOT} />
            }
          ],
        },
        {
          path: LOCATIONS.ESCALATE_YOUR_ISSUE.ROOT,
          element: hasModulePermission(MODULE_SLUG.ESCALATE_YOUR_ISSUE) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.ESCALATE_YOUR_ISSUE.ROOT,
              element: hasTypePermission(MODULE_SLUG.ESCALATE_YOUR_ISSUE, PERMISSION_SLUG.LIST) ? <EscalateIssueList permission={getPermissionsForModule(MODULE_SLUG.ESCALATE_YOUR_ISSUE)} /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />
            }
          ]
        },
        {
          path: LOCATIONS.SHARE_FEEDBACK_ROUTES.ROOT,
          element: hasModulePermission(MODULE_SLUG.SHARE_FEEDBACK) ? <Outlet /> : <Navigate to={LOCATIONS.DASHBOARD_ROUTE.ROOT} />,
          children: [
            {
              path: LOCATIONS.SHARE_FEEDBACK_ROUTES.ROOT,
              element: hasTypePermission(MODULE_SLUG.SHARE_FEEDBACK, PERMISSION_SLUG.LIST) ? <ShareFeedbackList permission={getPermissionsForModule(MODULE_SLUG.SHARE_FEEDBACK)} /> : <Navigate to={LOCATIONS.SHARE_FEEDBACK_ROUTES.ROOT} />
            }
          ]
        }
      ],
    },
  ];
};

export default routes;
