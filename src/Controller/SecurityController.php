<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
	/**
	 * @Route("/api/login/", name="app_login", methods={"POST"})
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function login(Request $request): JsonResponse
	{
		$user = $this->getUser();
		return new JsonResponse([
			'username' => $user->getUsername(),
			'roles' => $user->getRoles()
		]);
	}
}
