<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class ApiSecurityController
 * @package App\Controller
 */
class ApiSecurityController
{
	/**
	 * @Route("/api/login", name="app_login", methods={"POST"})
	 */
	public function login()
	{
	}
}
