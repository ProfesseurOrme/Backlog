<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiSecurityController
 * @package App\Controller
 */
class ApiSecurityController
{
	/**
	 * @Route("{_locale}/api/login", name="app_login", methods={"POST"}, requirements={"_locale" : "en|fr"})
	 */
	public function login()
	{
	}
}
