<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTAuthenticationSuccessListener
{
	public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $successEvent)
	{
		$data = $successEvent->getData();
		$user = $successEvent->getUser();

		if (!$user instanceof UserInterface) {
			return;
		}

		$data['data'] = array(
			'user' => $user->getUsername(),
			'roles' => $user->getRoles()
		);

		$successEvent->setData($data);
	}
}